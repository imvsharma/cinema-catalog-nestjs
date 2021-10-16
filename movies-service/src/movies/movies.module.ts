import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/movies/schema/movie.schema';
import { MoviesService } from './movies.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Movie.name, schema: MovieSchema}])],
  providers: [MoviesService]
})
export class MoviesModule {}
