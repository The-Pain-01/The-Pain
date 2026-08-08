export function runtime(seconds){


seconds =
Number(seconds);



const days =
Math.floor(
seconds / (3600 * 24)
);



const hours =
Math.floor(
(seconds % (3600 * 24)) / 3600
);



const minutes =
Math.floor(
(seconds % 3600) / 60
);



const secs =
Math.floor(
seconds % 60
);



return [

days ? `${days}d` : "",

hours ? `${hours}h` : "",

minutes ? `${minutes}m` : "",

`${secs}s`

]
.filter(Boolean)
.join(" ");



}



export function formatNumber(number){


return number
.toString()
.replace(/\D/g,"");


}



export function sleep(ms){


return new Promise(
resolve=>setTimeout(resolve,ms)
);


}