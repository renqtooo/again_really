import { supabase } from '../lib/supabase'

export const getCategory = async (id_user) => {
  const { data, error } = await supabase.rpc('get_categories', {
    p_profile_id: id_user
  })

  if (error) throw error
  return data
}

export const getCategoryByName = async (name, id_user) => {
  const { data, error } = await supabase
    .rpc('get_category_by_name', {
      p_name: name,
      p_profile_id: id_user
    })
    .maybeSingle()

  if (error) throw error
  return data
}

export const getCategoryById = async (id_category) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id_category', id_category)
    .single()

  if (error) throw error
  return data
}

export const getFavouriteCategories = async (id_user) => {
  const { data, error } = await supabase.rpc('get_favourite_categories', {
    p_profile_id: id_user
  })

  if (error) throw error
  return data
}

export const updateCategory = async (payload, id_user) => {
  if (payload.id_category) {
    const { data: existingCategory, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id_profile', id_user)
    .eq('id_category', payload.id_category)
    .maybeSingle()
    if (error) throw error
    
    if (existingCategory) {
      const { data, error } = await supabase
      .from('categories')
      .update({
        name: payload.name,
        usual_price: payload.usual_price,
        icon: payload.icon,
        id_profile: id_user,
        is_favourite: payload.is_favourite
      })
      .eq('id_category', payload.id_category)
      .eq('id_profile', id_user)
      .select()
      .maybeSingle()
      if (error) throw error
      return data
    }
  }
  
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: payload.name,
      usual_price: payload.usual_price,
      icon: payload.icon,
      id_profile: id_user,
      is_favourite: payload.is_favourite
    })
    .select()
    .maybeSingle()
  if (error) throw error
  return data
}

export const deleteCategory = async (id_category) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id_category', id_category)

  if (error) throw error
}