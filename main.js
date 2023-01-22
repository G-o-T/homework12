let form = document.forms.form;
let url = form.elements.url;
let name = form.elements.name;
let btn = document.querySelector('.btn');
let chat = document.querySelector('.chat');
let comment = form.elements.comment;
let finalComment;

//Запрещает вводить в поле ФИО цифры
document.querySelector('.comments__name').addEventListener('keyup', function (){
    this.value = this.value.replace(/[0-9]/, "");
});

//Функция корректирует написание ФИО по шаблону: Иванов Иван Иванович
let correctName;
function checkName () {
    let withoutSpaceName = name.value.trim();
    let delimiters = /\s+/;
    let nameElems = withoutSpaceName.split(delimiters);
    let correctNameElems = [];
    correctNameElems = nameElems.map(function (elem) {
        return elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase();
    });
    correctName = correctNameElems.join(' ');
        name.value = correctName;
}

// Функция тестирует функцию checkName
// function checkNameTest (name) {
//     console.log(checkName('УАНГ Ян')); // Уанг Ян
//     console.log(checkName('Константинопольский Константин Константинович')); // Константинопольский Константин Константинович
//     console.log(checkName('КонстАНТИНОПОЛЬский кОНСТАНТИН Константинович')); // Константинопольский Константин Константинович
//     console.log(checkName('  КонстАНТИНОПОЛЬский  кОНСТАНТИН Константинович  ')); // Константинопольский Константин Константинович
// }
// checkNameTest();

//Корректирует поле ФИО при потере фокуса на поле
name.addEventListener('blur', checkName);

//Функция проверяет введенное сообщение на наличие спама и заменяет его
function checkSpam () {
    let commentData = comment.value;
    let spamWords = [/viagra/gi, /xxx/gi, /ххх/gi, /виагр/gi];
    let finalComment = commentData;
    for (let i = 0; i < spamWords.length; i++) {
       finalComment = finalComment.replace(spamWords[i], '***');
    };
    return finalComment;
};

//Функция тестирует функцию checkSpam
// function checkSpamTest (commentData) {
//     console.log(checkSpam('viagra или XXX')); 
//     console.log(checkSpam('viagra или xxx'));
//     console.log(checkSpam('только viagra'));
//     console.log(checkSpam('только ххх'));
//     console.log(checkSpam('ViAgRa, viagra или xXx'));
//     console.log(checkSpam('Виагры и ххх тут нет'));
//     console.log(checkSpam('Тут есть все спам-слова: виагра, и viagra, и xxx, и ххх'));
//     console.log(checkSpam('В недрах тундры выдры в гетрах тырят в вёдра ядра кедров!')); // В недрах тундры выдры в гетрах тырят в вёдра ядра кедров!
//     console.log(checkSpam('123')); // 123
// }
// checkSpamTest();


//Функция создает div-обертку для нового сообщения и вставляет ее в div, отвечающий за поле чата
// для этого нужны correctName, finalComment и url
function createMessage () {
    event.preventDefault();
    
    let message = document.createElement('div');
    message.className = 'chat__message';
    chat.append(message);

    // Функция создает div-обертку для текстовых данных нового сообщения
    function createMessageInfo () {
        let messageInfo = document.createElement('div');
        messageInfo.className = 'chat__message-info';
        message.append(messageInfo);

        //Функция создает div для user name, отображаемого в сообщении
        function createUserName () {
            let userName = document.createElement('div');
            userName.className = 'chat__user-name';
            userName.innerHTML = correctName;
            messageInfo.append(userName);
            name.value = '';
        }

        createUserName();

        //Функция создает div для текста сообщения
        function createUserMessage () {
            let userMessage = document.createElement('div');
            userMessage.className = 'chat__user-message';
            userMessage.innerHTML = checkSpam();
            messageInfo.append(userMessage);
            comment.value = '';
        }
        createUserMessage ();
    }
        createMessageInfo();

        //Функция добавляет div для аватара
        function createAvatar () {
            let avatar = document.createElement('div');
            avatar.className = 'chat__avatar';
            message.append(avatar);

            //Функция задает картинку для аватара
            function createAvatarImage () {
                avatar.style.backgroundImage = `url(${url.value})`;
                url.value = '';
            }
            createAvatarImage ();
        }

        createAvatar();
}

btn.addEventListener('click', function () {
    event.preventDefault();
    if(!name.value) {
      alert('Поле имя не заполнено');
      return;
    }
    
    if(!url.value) {
      alert('Поле ccылки не заполнено');
      return;
    }
  
    if(!comment.value) {
      alert('Поле комментария не заполнено');
      return;
    }

    createMessage();
});


