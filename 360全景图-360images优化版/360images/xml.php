<?php
header('Content-Type: text/xml');
//$url_dir =  dirname($_SERVER['REQUEST_URI']).'/';



$images = array(
'qian.jpg',
'hou.jpg',
'zuo.jpg',
'you.jpg',
'shang.jpg',
'xia.jpg',
);
$titleurl_str = '';
foreach($images as $key=>$value){
	$titleurl_str .= ' tile'.$key.'url="'.$value.'" ';
}
//echo $titleurl_str;
echo <<<str
	
	<panorama id="" hideabout="1"> <view fovmode="0" pannorth="0"> <start
		pan="5.5" fov="80" tilt="1.5" /> <min pan="0" fov="80" tilt="-90" /> <max
		pan="360" fov="80" tilt="90" /> </view> <userdata title=""
		datetime="2013:05:23 21:01:02" description="" copyright="" tags=""
		author="" source="" comment="" info="" longitude="" latitude="" /> <hotspots
		width="180" height="20" wordwrap="1"> <label width="180"
		backgroundalpha="1" enabled="1" height="20" backgroundcolor="0xffffff"
		bordercolor="0x000000" border="1" textcolor="0x000000" background="1"
		borderalpha="1" borderradius="1" wordwrap="1" textalpha="1" /> <polystyle
		mode="0" backgroundalpha="0.2509803921568627"
		backgroundcolor="0x0000ff" bordercolor="0x0000ff" borderalpha="1" /> </hotspots>
	<media /> <input tilesize="700" tilescale="1.014285714285714"
		$titleurl_str />
	<autorotate speed="0.200" nodedelay="0.00" startloaded="1"
		returntohorizon="0.000" delay="5.00" /> <control simulatemass="1"
		lockedmouse="0" lockedkeyboard="0" dblclickfullscreen="0"
		invertwheel="0" lockedwheel="0" invertcontrol="1" speedwheel="1"
		sensitivity="8" /> </panorama>
str;
