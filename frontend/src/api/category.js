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

export const updateCategory = async (payload, id_user) => {
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
        id_profile: id_user
      })
      .eq('id_category', payload.id_category)
      .eq('id_profile', id_user)
      .select()
    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: payload.name,
        usual_price: payload.usual_price,
        icon: payload.icon,
        id_profile: id_user
      })
      .select()
    if (error) throw error
    return data
  }
}
