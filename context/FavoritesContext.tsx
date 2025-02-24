"use client"

import { addFavorite, getFavorites, removeFavorite } from "@/utils/supabase/favoritesApi";
import { Product } from "@/utils/supabase/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface FavoritesContextType{
  favorites: Product[]
  refreshFavorites: (authUserId: string) => Promise<void>
  toggleFavorite: (product: Product, authUserId: string) => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: {children: ReactNode})=>{
  const [favorites, setFavorites] = useState<Product[]>([])

  const refreshFavorites = async (authUserId: string) => {
    try {
      const favs = await getFavorites(authUserId)
      setFavorites(favs)
    } catch (error) {
      console.error(`Error fetching favorites: ${error}`)
    }
  }

  const toggleFavorite = async (product: Product, authUserId: string) => {
    const exists = favorites.some(fav => fav.id === product.id)
    try {
      if(exists){
        await removeFavorite(authUserId, product.id)
      } else{
        await addFavorite(authUserId, product.id)
      }

      refreshFavorites(authUserId)
    } catch (error) {
      console.error(`Error toggling favorite: ${error}`)
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, refreshFavorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if(!context){
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context;
}