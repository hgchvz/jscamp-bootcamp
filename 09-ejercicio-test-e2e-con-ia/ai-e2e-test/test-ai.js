process.loadEnvFile()

import { test } from 'node:test'
import assert from 'node:assert'

import { Stagehand } from '@browserbasehq/stagehand'

test('Un usuario puede entrar a la JSConf y adquirir dos entradas por €287.98', async() =>{
    const stagehand = new Stagehand({
        env: 'LOCAL',
        modelName: 'gpt-4o-mini'
    })

    await stagehand.init()

    const [page] = stagehand.context.pages()

    await page.goto('https://jsconf.es')

    //Lo quiero que haga
    await stagehand.act('Clicar en el botón de "Comprar entradas"')

    await stagehand.act('Click en el "+" al lado de "Entrada General" para añadir un ticket')
    await stagehand.act('Click en el "+" al lado de "Entrada General" para añadir un segundo ticket')

    //Extraer información
    const { extraction } = await stagehand.extract("Obtén el subtotal de la página")
    console.log('Subtotal extraido: ', extraction)

    assert.strictEqual(extraction, '€287.98')

    await stagehand.close()
})