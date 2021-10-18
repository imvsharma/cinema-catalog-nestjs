import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { Movie, MovieDocument } from 'src/movies/schema/movie.schema';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  getAllMovies (): Promise<Movie[]> {
    try {
      return this.movieModel.find({}, {title: 1, id: 1}).exec();
    } catch (err) {
      throw new Error("Error in getting movies from db");
    }
    
  }

  getMoviePremiers() {

  }

  getMovieById () {

  }
}
