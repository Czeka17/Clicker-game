interface EggProps{
    width:number;
    x?:number
    y?:number
    onClick?:() => void;
}
function Egg({width,x,y, onClick}:EggProps){
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width={width} x={x} y={y} viewBox="0 -0.5 32 32" shape-rendering="crispEdges">
<metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
<path  stroke="#000000" d="M14 11h4M13 12h1M18 12h1M12 13h1M19 13h1M11 14h1M20 14h1M11 15h1M20 15h1M10 16h1M21 16h1M10 17h1M21 17h1M9 18h1M22 18h1M9 19h1M22 19h1M9 20h1M22 20h1M9 21h1M22 21h1M9 22h1M22 22h1M9 23h1M22 23h1M9 24h1M22 24h1M9 25h1M22 25h1M9 26h1M22 26h1M10 27h1M21 27h1M11 28h1M20 28h1M12 29h8" />
<path stroke="#7a7a79" d="M14 12h4M13 13h2M17 13h2M12 14h2M18 14h2M12 15h1M19 15h1M11 16h2M19 16h2M11 17h1M20 17h1M10 18h2M20 18h2M10 19h1M21 19h1M10 20h1M21 20h1M10 21h1M21 21h1M10 22h1M21 22h1M10 23h1M21 23h1M10 24h1M21 24h1M10 25h1M21 25h1M10 26h2M20 26h2M11 27h2M19 27h2M12 28h8" />
<path stroke="#898989" d="M15 13h2M14 14h4M13 15h6M13 16h6M12 17h8M12 18h8M11 19h10M11 20h10M11 21h10M11 22h10M11 23h10M11 24h10M11 25h10M12 26h8M13 27h6" />
</svg>
}
export default Egg