import { main } from './express'
import { getApplicationUseCases } from './GetApplicationUseCase'

export async function bootstrap (): Promise<void> {
  const useCases = await getApplicationUseCases()

  main(useCases)
}

void bootstrap()
