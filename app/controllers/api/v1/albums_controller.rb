class Api::V1::AlbumsController < ApiController
  # @route GET /api/v1/albums (api_v1_albums)
  def index
    @albums = Album.all
    render 'api/v1/albums/index'
  end

  # @route GET /api/v1/albums/:id (api_v1_album)
  def show
    @album = Album.find(params[:albumId])
    render :show
  end
end
