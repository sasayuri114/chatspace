class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    @group = Group.find(params[:group_id])
    @comments = group.comments.includes(:user).where("id > #{last_comment_id}")
  end
end