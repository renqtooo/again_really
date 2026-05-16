import { Box, Button, Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconEdit, IconHeart, IconHeartFilled, IconTrashX } from "@tabler/icons-react"
import { iconMap } from "../composables/category"
import { formatCurrency } from "../composables/currency"
import { useNavigate } from "react-router-dom"
import { useCategory, useUpdateCategory } from "../hooks/useCategory"
import Loading from "./Loading"

export default function CategoryList({
  filteredCategories=null,
  favouriteBtn=false,
  editBtn=false,
  onSelect=null,
  delBtn=null
}) {

  const { mutate: updateCategory, isPending: isUpdateLoading } = useUpdateCategory()
  const { data: categories, isLoading: isCategoriesLoading } = useCategory(filteredCategories)
  
  const updateFavourite = (category) => {
    category.is_favourite = !category.is_favourite
    updateCategory(category)
  }

  const navigate = useNavigate()

  return (
    <>
    {isCategoriesLoading && <Loading />}
    <Stack mb='xl' pb='xl' gap='md'>
      {(filteredCategories ?? categories)?.map((category) => {
        const IconComponent = iconMap[category?.icon]

        return (
          <Card
            onClick={() => onSelect && onSelect(category)}
            key={category?.id_category}
            radius='28px'
            p='xs'
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <Group justify='space-between' wrap='nowrap'>
              <Group gap='md' style={{ flex: 1, minWidth: 0 }}>
                <ThemeIcon
                  size={54}
                  radius='xl'
                  variant='gradient'
                  gradient={{ from: 'violet', to: 'grape' }}
                >
                  {IconComponent ? (
                    <IconComponent size={26} />
                  ) : null}
                </ThemeIcon>

                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    fw={800}
                    size='lg'
                    c='white'
                    truncate
                  >
                    {category?.name}
                    <br />
                    {category?.usual_price && (
                      <Text
                        component='span'
                        fw={900}
                        size='lg'
                        c='accent'
                        truncate
                      >
                        € {formatCurrency(category?.usual_price)}
                      </Text>
                    )}
                  </Text>
                </Box>
              </Group>

              <Group gap='xs'>
                {editBtn && !isUpdateLoading &&
                  <Button
                  radius='xl'
                  variant='transparent'
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/category/' + category.id_category, {state:{from:'customize'}})}
                  }
                  size='xs'
                  style={{padding: '0', width: '2.5rem'}}
                  >
                    <IconEdit size={30} />
                  </Button>
                }

                {favouriteBtn && !isUpdateLoading &&
                  <Button
                  radius='xl'
                  variant='transparent'
                  onClick={(e) => {
                    e.stopPropagation()
                    updateFavourite(category)}
                  }
                  size='xs'
                  style={{padding: '0', width: '2.5rem'}}
                  >
                    {category.is_favourite
                      ? <IconHeartFilled size={25} />
                      : <IconHeart size={25} />
                    }
                  </Button>
                }

                {delBtn && !isUpdateLoading &&
                  <Button
                  radius='xl'
                  variant='transparent'
                  size='xs'
                  style={{padding: '0', width: '2.5rem'}}
                  >
                    <IconTrashX color='red' size={25} />
                  </Button>
                }
              </Group>
            </Group>
          </Card>
        )
      })}
    </Stack>
    </>
  )
}