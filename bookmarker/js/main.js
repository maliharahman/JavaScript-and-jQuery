//add event listener for submit button

document.getElementById('myForm').addEventListener('submit',saveBookmark);
function saveBookmark(e)
{
   var siteName=document.getElementById('siteName').value;
   var siteUrl=document.getElementById('siteUrl').value;

   if(!siteName || !siteUrl)
   {
       alert("Please fill in the form!");
       document.getElementById('myForm').reset();
       return false;
   }

    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex))
    {
        alert("Please enter valid URL!");
        document.getElementById('myForm').reset();
        return false;
    }

    var bookmark=
    {
        name:siteName,
        url:siteUrl
    }

    //save all the bookmark as value in an array named bookmarks
    if(localStorage.getItem("bookmarks")===null)
    {
        var bookmarks=[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else
    {
        var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();

    fetchBookmark();
    e.preventDefault();
}


function deleteBookmark(url)
{
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;++i)
    {
        if(bookmarks[i].url===url)
        {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmark();
}


function fetchBookmark()
{
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResult=document.getElementById('bookmarksResult');

    bookmarksResult.innerHTML='';
        for (var i = 0; i < bookmarks.length; i++)
        {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;

            bookmarksResult.innerHTML += '<div class="well">' +
                '<a> ' + name +
                ' <a class="btn btn-primary" target="_blank" href="' + url + '">Visit</a> ' +
                ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> '
                + '</h3>'
                + '</div>';
        }
}