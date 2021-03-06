class Api::V1::AlbumsController < ApiController
  # @route GET /api/v1/albums/top_albums
  def top_albums
    @albums = Album.where("rank IS NOT NULL")
    render 'api/v1/albums/top_albums'
  end

  # @route GET /api/v1/albums
  def index
    @albums = Album.all
    render 'api/v1/albums/index'
  end

  # @route GET /api/v1/albums/:album_id
  def show
    @album = Album.find(params[:album_id])
    render :show
  end
end
