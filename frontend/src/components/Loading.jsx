import { Flex, Loader } from '@mantine/core'

export default function Loading() {
  return (
    <Flex justify='center' align='center' style={{ height: '90dvh' }}>
      <Loader color='orange' />
    </Flex>
  )
}
