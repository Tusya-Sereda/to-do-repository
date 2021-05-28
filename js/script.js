let allTasks = JSON.parse(localStorage.getItem('tasks')) || []; // получение//(парсим) наши таски, если данных нет, то массив пустой
let valueInput = '';
let input = null; // всё время обнулять input
let indexEdit = -1;

window.onload = function init () {
    input = document.getElementById('add-task'); //с input получаем элемент по id - находим в документе
    input.addEventListener('change', updateValue); // включаем слушателя на input, чтобы записать change - какое-то изменение  
    input.addEventListener('keyup', updateValue1);
    render(); // если элементы есть прям сразу, то после того, как загрузится наша страница. Можно сразу перейти к рендеру и отобразить все наши таски 
}

onClickButton = () => { // при нажатии на клик 

  if(valueInput){

    allTasks.push({
      text: valueInput, // текст, который мы получаем из input
      isCheck: false // состояние 
    })
    
    //после каждого нажатия кнопки Add запускается функция render(), которая будет записывать наши таски
    render(); //будет отображать все наши элементы
  }else{
    alert('Неа, так незя делать');
  }

  localStorage.setItem('tasks', JSON.stringify(allTasks)); //сохранение наши тасков
  
  valueInput =''; // обнуляем значение инпута
  input.value = ''; // присваиваем значение валью инпуту - пустую строку, после записи в массив, инпут и валью обнуляются

}

updateValue = (event) => { // в функцию получаем какое-то событие

  valueInput = event.target.value; // присваиваем valueInput значения с нашего инпута
  console.log('value', valueInput);
}

/*При нажатии на ENTER*/
updateValue1 = (event) => {
  if(event.keyCode === 13){
    onClickButton();
  }
}

render = () => {
  const content = document.getElementById('content_page'); // куда мы будем добавлять наши элементы  - область content-page
  /*проходимся по всему массиву наших тасков*/
  
  while(content.firstChild){ //смотрим, есть ли первый дочерний элемент 
    content.removeChild(content.firstChild); // чтобы наши элементы не дублировались 
  }
  
  allTasks.map((item, index) => {
    //делаем главного контейнера с нашим таском
    const container = document.createElement('div'); //мы создаём новый класс div, который и будет первым нашим контейнером 
    container.id = `task - ${index}`;
    container.className = 'task-container';

    // добавление картинки "изменение"
    const container_for_image = document.createElement('div');
    container_for_image.className = 'image_container';
    
    //Добавление текст в контейнер таска
    if(index === indexEdit){

      const input = document.createElement('input');
      input.className = 'editInput';
      input.value = item.text; //значение инпута равно нашему тексту 
      container.appendChild(input);

      const imageCheck = document.createElement('img');
      container_for_image.appendChild(imageCheck);
      imageCheck.src = '/images/check.svg';
      imageCheck.className = 'image_class check';

      imageCheck.onclick = function() {
        onClickImageCheck(input.value, index);
      }

      //добавление картинки "удаление"
      const imageBack = document.createElement('img');
      container_for_image.appendChild(imageBack);
      imageBack.src = '/images/back.svg';
      imageBack.className = 'image_class back';

      imageBack.onclick = function() {
        onClickImageBack(index);
      }

    } else {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.isCheck;

      checkbox.onchange = function () { //при клике на чекбокс мы вызываем функцию. Когда мы хотим сделать галочку done 
        onChangeCheckBox(index);
      } 
      container.appendChild(checkbox);

      const text = document.createElement('p');
      text.innerText = item.text;
      text.className = item.isCheck ? 'text-task done-text': 'text-task';
      container.appendChild(text); 
      
      if(!item.isCheck){
        const imageEdit = document.createElement('img');
        container_for_image.appendChild(imageEdit);
        imageEdit.src = '/images/edit.svg';
        imageEdit.className = 'image_class edit';
        
        imageEdit.onclick = function() {
          onClickImageEdit(index);
        }
      }

      const imageDelete = document.createElement('img');
      container_for_image.appendChild(imageDelete);
      imageDelete.src = '/images/delete.svg';
      imageDelete.className = 'image_class delete';

      imageDelete.onclick = function() {
        onClickImageDelete(index);
      }
    }

    container.appendChild(container_for_image); // добавление image 
    content.appendChild(container);
  });

  console.log(allTasks);
}

onChangeCheckBox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTasks)); //сохранение наши тасков
  render();
}

onClickImageEdit = (index) => {
  indexEdit = index;
  localStorage.setItem('tasks', JSON.stringify(allTasks)); //сохранение наши тасков
  render();
  
}

onClickImageDelete = (index) => {
  allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks)); //сохранение наши тасков
  render(); // запускаю свою же функцию, которая удаляет елемент 
}

onClickImageBack = (index) => {
  indexEdit = null;
  localStorage.setItem('tasks', JSON.stringify(allTasks)); //сохранение наши тасков
  render();
}

onClickImageCheck = (digit, index) => {
  allTasks[index].text = digit;
  indexEdit = null;
  localStorage.setItem('tasks', JSON.stringify(allTasks)); //сохранение наши тасков
  render();
}


