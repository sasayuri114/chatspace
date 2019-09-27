$(function() {
  function buildHTML(comment){
    var image = comment.image ? `<img src= ${ comment.image }>` : "";
    var html = `<div class="comment" data-id="${comment.id}">
                    <div class="comment__upper-info">
                        <div class="comment__upper-info__talker">
                            ${ comment.user_name }
                        </div>
                        <div class="comment__upper-info__date">
                            ${ comment.date }
                        </div>
                    </div>
                    <div class = "comment__text"> 
                      <div class="lower-comment__content">
                          ${comment.content}
                      </div>
                      <div class ="lower-comment__image">
                          ${image}
                      </div>
                    </div>
                </div>`
    return html;
  }
  $("#new_comment").on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    .done(function(data){
      var html = buildHTML(data);
      $('.comments').append(html);
      $("#new_comment")[0].reset();
      $('.form__comment').val('');
      $('.form__submit').prop('disabled', false);
      $('.comments').animate({ scrollTop: $('.comments')[0].scrollHeight }, "first");
    })
    .fail(function(data){
      $('.form__submit').prop('disabled', false);
    })
  }) 

  function reloadMessages() {
    if (window.location.href.match(/\/groups\/\d+\/comments/)){
      var last_comment_id = $('.comment:last').data("id");
      $.ajax({ 
        url: "api/comments",  
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_comment_id} 
      })
      .done(function(comments){  
        console.log(comments);
        var insertHTML = '';
        comments.forEach(function (comment) {
          insertHTML += buildHTML(comment); 
          $('.comments').append(insertHTML);
          $('.comments').animate({ scrollTop: $('.comments')[0].scrollHeight }, "first");
        })
       
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      })
    }
  }
  setInterval(reloadMessages, 5000);
});