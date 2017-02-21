require('./seedrandom/seedrandom');

let seed = Math.random();

export function array_randS(a:any){
  if(a instanceof Array && !(a instanceof String)){
    Math.seedrandom(a.toString() + seed);
    return a[parseInt(Math.random() * a.length + '')];
  }
  return a;
}

export function array_rand(a:any){
  if(a instanceof Array && !(a instanceof String)){
    Math.seedrandom(new Date().getTime().toString());
    return a[parseInt(Math.random() * a.length + '')];
  }
  return a;
}

export function resetSeed()
{
  seed = Math.random();
}