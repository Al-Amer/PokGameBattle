import { Router } from 'express';
import {
  getPokemonList,
  getPokemonByName,
  getRandomPokemon,
  getPokemonTypes,
  searchPokemon
} from '../controllers/pokemonController';

const router = Router();

router.get('/', getPokemonList);
router.get('/random', getRandomPokemon);
router.get('/types', getPokemonTypes);
router.get('/search', searchPokemon);
router.get('/:nameOrId', getPokemonByName);

export default router;
