const btnToggle=document.querySelector('.toggle-btnn ');


btnToggle.addEventListener('click',function(){
    document.getElementById('sidebar').classList.toggle('active');
});