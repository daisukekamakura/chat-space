$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message__box" data-message-id=${message.id}>
          <div class="user">
            <div class="user__name">
              ${message.user_name}
            </div>
            <div class="user__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="message__content">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message__box" data-message-id=${message.id}>
        <div class="user">
          <div class="user__name">
            ${message.user_name}
          </div>
          <div class="user__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <p class="message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);      
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.form__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
  });

  let reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message__box:last').data("message-id") || 0;
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
      
        if (messages.length !== 0) {
          let insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main-chat__message-list').append(insertHTML);
          $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages, 7000);
}); 