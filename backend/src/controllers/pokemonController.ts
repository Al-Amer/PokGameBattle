import { Request, Response } from 'express';
import pokemonService from '../services/pokemonService';

export const getPokemonList = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const pokemonList = await pokemonService.getPokemonList(limit, offset);
    res.json({ success: true, data: pokemonList });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch Pokémon list' });
  }
};

export const getPokemonByName = async (req: Request, res: Response) => {
  try {
    const { nameOrId } = req.params;
    const pokemon = await pokemonService.getPokemonByName(nameOrId);
    res.json({ success: true, data: pokemon });
  } catch (error) {
    res.status(404).json({ success: false, error: 'Pokémon not found' });
  }
};

export const getRandomPokemon = async (req: Request, res: Response) => {
  try {
    const pokemon = await pokemonService.getRandomPokemon();
    res.json({ success: true, data: pokemon });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch random Pokémon' });
  }
};

export const getPokemonTypes = async (req: Request, res: Response) => {
  try {
    const types = await pokemonService.getPokemonTypes();
    res.json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch Pokémon types' });
  }
};

export const searchPokemon = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }
    const results = await pokemonService.searchPokemon(q as string);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Search failed' });
  }
};
