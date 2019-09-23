json.user_name    @comment.user.name

json.content    @comment.name

json.date   @comment.created_at.strftime("%Y/%m/%d %H:%M")

json.id    @comment.id

json.image    @comment.image.url