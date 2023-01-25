const hideForm=function(){
    const el=document.querySelector('.alert')
    if(el) el.parentElement.removeChild(el)
}
export const Alert=function(type,msg){
    const markup=`
    <div class="alert alert--${type}">
        <p class="txt-msg">
            ${msg}
        </p>
    </div>
    `
    const alertWindow=document.querySelector('.alert-window')
    alertWindow.innerHTML=''
    alertWindow.insertAdjacentHTML('afterbegin',markup)
    
    setTimeout(() => {
        hideForm()
    },2000);
}