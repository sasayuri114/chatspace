$(document).on('turbolinks:load', function() {
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
      
      scrollBottom();function 
      scrollBottom(){
        var target = $('.comment').last();
        var position = target.offset().top + $('.comments').scrollTop();
        $('.comments').animate({
          scrollTop: position
        }, 300, 'swing');
      }
    })
    .fail(function(data){
      alert('エラー が発生したためメッセージは送信出来ませんでした');
      $('.form__submit').prop('disabled', false);
    })      
  }) 
  //自動更新
  function reloadComments(){
    var last_comment_id = $('.timeline__bodyList').last().data('id');
    var href = 'api/comments'
    $.ajax({
    url: href,
    type: 'GET',
    data:{id: last_comment_id},
    dataType: 'json'
    })
    .done(function(comments){
      var insertHTML = '';
      console.log(insertHTML);
      comments.forEach(function(comment){
        var insertHTML = buildHTML(comment)
        $('comment').append(insertHTML)
      });
      $('.timeline__body').animate({scrollTop: $('.timeline__body')[0].scrollHeight}, 'fast');
    })

    .fail(function(){
      console.log('error'); 
    });
  };
  setInterval(reloadComments, 5000);
  
});
