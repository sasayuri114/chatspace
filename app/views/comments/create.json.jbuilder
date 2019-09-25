# json.user_name    @comment.user.name

# json.content      @comment.name

# json.date   @comment.created_at.strftime("%Y/%m/%d %H:%M")

# json.id    @comment.id

# json.image    @comment.image.url
json.(@message, :content, :image)
json.created_at @message.created_at
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id