import { CoolException } from '@exceptions'

try {
    const a = new CoolException('error')
} catch (error) {
    console.log(error)
}


