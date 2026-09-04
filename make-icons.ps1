param([string]$Out = "C:\Users\Admin\Downloads\woordenschat-pwa")
Add-Type -AssemblyName System.Drawing

function C($hex){ return [System.Drawing.ColorTranslator]::FromHtml($hex) }

function RoundRect([float]$x,[float]$y,[float]$w,[float]$h,[float]$r){
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r*2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x+$w-$d, $y, $d, $d, 270, 90)
  $p.AddArc($x+$w-$d, $y+$h-$d, $d, $d, 0, 90)
  $p.AddArc($x, $y+$h-$d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

# Woordenschat: green ground, two stacked white cards (flashcards), Dutch flag bands on the front card
function Draw-Master([float]$scale, [bool]$simple){
  $S = 1024
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $S, $S
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear((C '#1F9D6F'))

  $g.TranslateTransform($S/2, $S/2)
  $g.ScaleTransform($scale, $scale)
  $g.TranslateTransform(-$S/2, -$S/2)

  $white = New-Object System.Drawing.SolidBrush -ArgumentList (C '#FFFFFF')
  $back  = New-Object System.Drawing.SolidBrush -ArgumentList ([System.Drawing.Color]::FromArgb(150, 255, 255, 255))
  $red   = New-Object System.Drawing.SolidBrush -ArgumentList (C '#AE1C28')
  $blue  = New-Object System.Drawing.SolidBrush -ArgumentList (C '#21468B')

  if($simple){
    $cx=112; $cy=200; $cw=800; $ch=624; $r=96
  } else {
    # back card, offset up-right
    $bcard = RoundRect 232 152 672 560 80
    $g.FillPath($back, $bcard)
    $cx=136; $cy=280; $cw=672; $ch=560; $r=80
  }
  $card = RoundRect $cx $cy $cw $ch $r
  $g.FillPath($white, $card)

  $g.SetClip($card)
  $bandH = [float]($ch * 0.42 / 3)
  $by = [float]($cy + $ch - 3*$bandH)
  $g.FillRectangle($red,   [float]$cx, $by,                   [float]$cw, $bandH)
  $g.FillRectangle($white, [float]$cx, [float]($by+$bandH),   [float]$cw, $bandH)
  $g.FillRectangle($blue,  [float]$cx, [float]($by+2*$bandH), [float]$cw, [float]($bandH+2))
  $g.ResetClip()

  if(-not $simple){
    # two "text lines" on the front card, green
    $line = New-Object System.Drawing.SolidBrush -ArgumentList (C '#1F9D6F')
    $lx = [float]($cx + 72); $ly = [float]($cy + 90)
    $g.FillPath($line, (RoundRect $lx $ly 300 44 22))
    $g.FillPath($line, (RoundRect $lx ($ly+84) 420 44 22))
    $line.Dispose()
  }
  $white.Dispose(); $back.Dispose(); $red.Dispose(); $blue.Dispose()
  $g.Dispose()
  return $bmp
}

function Save-Sized($master, [int]$size, [string]$name){
  $bmpOut = New-Object System.Drawing.Bitmap -ArgumentList $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmpOut)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($master, 0, 0, $size, $size)
  $g.Dispose()
  $path = Join-Path $Out $name
  $bmpOut.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmpOut.Dispose()
  Write-Output "wrote $name ($size px)"
}

$any = Draw-Master 1.0 $false
foreach($s in 192,512){ Save-Sized $any $s "icon-$s.png" }
Save-Sized $any 180 "apple-touch-icon.png"
$any.Dispose()

$mask = Draw-Master 0.74 $false
Save-Sized $mask 192 "icon-maskable-192.png"
Save-Sized $mask 512 "icon-maskable-512.png"
$mask.Dispose()

$fav = Draw-Master 1.0 $true
Save-Sized $fav 32 "favicon-32.png"
Save-Sized $fav 16 "favicon-16.png"
$fav.Dispose()
