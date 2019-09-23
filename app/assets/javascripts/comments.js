$(document).on('turbolinks:load', function() {
  function buildHTML(comment){
    var image = comment.image ? `<img src= ${ comment.image }>` : "";
    var html = `<div class="comment">
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
})