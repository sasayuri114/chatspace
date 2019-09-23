$(document).on('turbolinks:load', function() {
  function buildHTML(comment){
    var content = comment.name ? `${ comment.name}` : "";
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
                          ${content}
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
    // function scroll() {
    //   $('.comments').animate({scrollTop: $('.comment')[0].scrollHeight});
    // }
    .done(function(data){
      var html = buildHTML(data);
      $('.comments').append(html);
      $('.form__comment').val('');
      $('.form__submit').prop('disabled', false);
      $('.comments').animate({scrollTop: $('.comments')[0].scrollHeight}, 'fast');
      // scroll()
    })
    .fail(function(data){
      alert('エラー が発生したためメッセージは送信出来ませんでした');
      $('.form__submit').prop('disabled', false);
    })      
  }) 
})