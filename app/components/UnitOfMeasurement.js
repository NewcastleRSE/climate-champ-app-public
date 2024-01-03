import { Text } from 'react-native'
export default function UnitOfMeasurement({ value, singular, plural }) {
  return value == 1 ? (
    <Text style={{ alignSelf: 'center', fontSize: 18 }}>{singular}</Text>
  ) : (
    <Text style={{ alignSelf: 'center', fontSize: 18 }}>{plural}</Text>
  )
}
