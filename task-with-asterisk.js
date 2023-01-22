let str;

//Функция удаляет все теги в строке
function deleteTags(str) {
    let tags = /<[^>]+>/gi;
    return str.replace(tags, '');
};

//Функция для проверки функции deleteTags
function deleteTagsTest () {
    console.log(deleteTags('<img>тег')); //тег
    console.log(deleteTags('<p>тут текст</p>')); // тут текст
    console.log(deleteTags('<p>текст и много тегов<br><br /></p>')); // текст и много тегов
    console.log(deleteTags('<textarea class="comments__input comments__input-textarea" name="comment" id="comment" cols="30" rows="10" required>Еще какой-то текст</textarea>')); // Еще какой-то текст
    console.log(deleteTags('<script src="file.js"></script>')); //
    console.log(deleteTags('<script">alert(1);</script>')); //alert(1);
}

deleteTagsTest();
