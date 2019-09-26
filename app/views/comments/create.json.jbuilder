json.content      @comment.name
json.user_name    @comment.user.name
json.date         @comment.created_at
json.image        @comment.image.url
json.id           @comment.id