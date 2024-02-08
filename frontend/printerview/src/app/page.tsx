import { AuthProvider } from '@/components/context/authProvider'
import Main from '@/components/ui/Main'

export default function Home() {
  return (
    <AuthProvider>
      <Main>
        <div className="w-3/4 text-justify text-md font-semibold">
          <h1 className="font-bold text-3xl">Bem-vindo ao Printerview!</h1>
          <p>
            Aqui na Printerview, estamos comprometidos em simplificar o processo
            de geração de relatórios a partir dos dados CSV do Printerlogger.
            Sabemos que acompanhar o desempenho e a eficiência das suas
            impressoras pode ser uma tarefa desafiadora, mas com nossa aplicação
            web intuitiva, você pode transformar rapidamente esses dados em
            insights acionáveis.
          </p>
          <p>
            Nossa plataforma foi projetada para ser fácil de usar, mesmo para
            aqueles sem experiência técnica. Com apenas alguns cliques, você
            pode importar seus arquivos CSV, visualizar estatísticas detalhadas
            e criar relatórios personalizados que atendam às suas necessidades
            específicas. Quer você esteja monitorando o uso de papel, o consumo
            de tinta ou a produtividade geral, o Printerview está aqui para
            ajudar.
          </p>
          <p>
            Além disso, nossa equipe está constantemente trabalhando para
            adicionar novos recursos e aprimorar a experiência do usuário.
            Estamos comprometidos em fornecer uma solução abrangente que ajude
            sua empresa a otimizar seus processos de impressão e economizar
            tempo e recursos. Então, se você está pronto para simplificar sua
            análise de dados de impressão, junte-se a nós no Printerview.
          </p>
          <p>
            Estamos ansiosos para ajudá-lo a aproveitar ao máximo seus dados e
            impulsionar o sucesso do seu negócio.
          </p>
        </div>
      </Main>
    </AuthProvider>
  )
}
