function typeWriter(el, textArray) {
        
    el.innerHTML = '';
    textArray.forEach((letter, i) =>
        setTimeout(() => (el.innerHTML += letter), 95 * i)
    );
    
    setTimeout(() => typeWriter(el, textArray), 10000);
}
const textArray = "Hi, I'm Jurgis, full-stack web developer.".split('');
const introTitle = document.getElementsByClassName("introTitle");
typeWriter(introTitle[0], textArray);   