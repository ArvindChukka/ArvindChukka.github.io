let arr=[];
let indcol=[-1,-1];
let k=0;
let s=0;
let slider=document.querySelector("#range");
let text=document.querySelector("#speed");
text.innerHTML=slider.value+"x";
let time=1000/slider.value;
slider.oninput = function() {
    text.innerHTML = this.value+"x";
    time=1000/slider.value;
  }

inputf();
function inputf(){
let n=document.querySelector("#input").value;
let c=document.getElementById("container");
let arrtemp=[];
c.innerHTML="";
for(let i=0;i<n;i++){
    let val=Math.random()*100;
    arrtemp[i]=val;
    
}
arr=arrtemp;
for(let i=0;i<arr.length; i++){
    let val=arr[i];
    let bar=document.createElement("div");
    bar.style.height=val+"%";
    bar.classList.add("bar");
    c.appendChild(bar);
}

}
function clearf(){
    let c=document.getElementById("container");
    c.innerHTML="";
    document.querySelector("#input").value="";
    for(let i=0; i<arr.length; i++){
        arr[i]=0;
    }
}
document.querySelector("#btn1").addEventListener("click",inputf);
//document.querySelector("#btn2").addEventListener("click",clearf);


// BUBBLE SORT


function show(move){
    let l=arr.length;
    let c=document.getElementById("container");
    c.innerHTML="";
    for(let i=0;i<arr.length; i++){
    let val=arr[i];
    let bar=document.createElement("div");
    bar.style.height=val+"%";
    bar.classList.add("bar");
    if(move && move.indices.includes(i)){
        if(move.type=="swap"){
        bar.style.backgroundColor="red";
    }
    else{
        bar.style.backgroundColor="green";
    }
    }
    if(move && i>=l-move.sort ){
        bar.style.backgroundColor="brown";
    }
if(move==null)
{
    bar.style.backgroundColor="brown";
}
    c.appendChild(bar);
}
}
function recmoves(a){
    let temp;
    let moves=[];
    for(let i=0; i<a.length;i++){
        for(let j=0; j<a.length-i-1; j++){
            moves.push( {indices:[j,j+1], type:"comp",sort:s});
            if(a[j]>a[j+1]){
                moves.push( {indices:[j,j+1], type:"swap",sort:s});
                temp=a[j];
                a[j]=a[j+1];
                a[j+1]=temp;
            }
        }
        s++;
    }
    return moves;
}
function bubble(){
    let copyarr=[...arr];
    s=0;
    let moves=recmoves(copyarr);
    animate(moves);
}
function animate(moves){
    if(moves.length==0){
        show();
        return;
    }
    let move=moves.shift();
    let [i,j]=move.indices;
    if(move.type=="swap"){
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
}
    show(move);
    setTimeout(
        ()=>{
            animate(moves);
        },time
    )
}



// SELECTION SORT


document.querySelector("#bubble").addEventListener("click",bubble);
function selectmovess(a){
    let moves=[];
    let temp;
    for(let i=a.length-1; i>-1; i--){
        let k=0;
        for(let j=1; j<=i;j++){
        moves.push({indices:[k,j], type:"comp"});
        if(a[j]>a[k]){
            moves.push({indices:[k,j], type:"select"});
            k=j;
        }
        }
        moves.push({indices:[k,i], type:"swap"});
        temp=a[i];
        a[i]=a[k];
        a[k]=temp;
    }
    return moves;
}
function selection(){
    indcol=[-1,-1];
    let copyarr=[...arr];
    let moves=selectmovess(copyarr);
    k=0;
    selectanimate(moves);
}
function selectanimate(moves){
    if(moves.length==0){
        selectshow(null,k);
        return;
    }
    let move=moves.shift();
    let [i,j]=move.indices;
    if(move.type=="swap"){
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
    k++;
    }
    selectshow(move,k);
    setTimeout(
        ()=>{
            selectanimate(moves);
        },time
    )
}
function selectshow(move,k){
    let c=document.getElementById("container");
    c.innerHTML="";
    let l=arr.length;
    for(let i=0;i<arr.length; i++){
    let val=arr[i];
    let bar=document.createElement("div");
    bar.style.height=val+"%";
    bar.classList.add("bar");
    if(move && move.indices.includes(i)){
        if(move.type=="swap"){
            bar.style.backgroundColor="red";
        }
        else if(move.type=="select" && i==move.indices[0]){
            bar.style.backgroundColor="green";
        }
        else{
            bar.style.backgroundColor="green";
        }
    }
    if(i>=l-k){
        bar.style.backgroundColor="brown";
    }
    c.appendChild(bar);
}
}
document.querySelector("#selection").addEventListener("click",selection);
//document.querySelector("#stop").addEventListener("click",stop());
function stop(){
     inputf();
}


// MERGE SORT

document.querySelector("#merge").addEventListener("click",mergesort);


function drawArray(arr, highlightIndices = []) {
    let container = document.getElementById("container");
    container.innerHTML = "";

    arr.forEach((value, index) => {
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = value+"%";

        if (highlightIndices.includes(index)) {
            bar.style.backgroundColor="red";
        }

        container.appendChild(bar);
    });
}


async function mergeSortHelper(arr, start, end) {
    if (end - start <= 1) {
        return;
    }

    const mid = Math.floor((start + end) / 2);

    await mergeSortHelper(arr, start, mid);
    await mergeSortHelper(arr, mid, end);

    let left = start;
    let right = mid;
    const temp = [];

    while (left < mid && right < end) {
        if (arr[left] < arr[right]) {
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            right++;
        }
    }

    while (left < mid) {
        temp.push(arr[left]);
        left++;
    }

    while (right < end) {
        temp.push(arr[right]);
        right++;
    }

    for (let i = start; i < end; i++) {
        arr[i] = temp[i - start];
        drawArray(arr, [i]); // Highlight the current bar
        await new Promise(resolve => setTimeout(resolve, time)); // Delay for visualization
    }
}

async function mergesort() {
    await mergeSortHelper(arr, 0, arr.length);
    drawArray(arr);
}



