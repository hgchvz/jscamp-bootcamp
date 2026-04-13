import { useRouter } from "./hooks/useRouter.jsx"
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { Breadcrumb } from "./components/Breadcrumb.jsx"
import { HomePage } from "./pages/Home.jsx"
import { SearchPage } from "./pages/Search.jsx"
import { SignInPage } from "./pages/SignIn.jsx"
import { NotFoundPage } from "./pages/404.jsx"
import { PageTransition } from "./components/PageTransition.jsx"
import { Route } from "./components/Route.jsx"

function App() {
  const { currentPath } = useRouter();
  const knownRoutes = ['/', '/search', '/signin'];
  const isNotFound = !knownRoutes.includes(currentPath);

  return (
    <>
      <Header />
      <Breadcrumb />
      <PageTransition key={currentPath}>
          <Route path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/signin" component={SignInPage} />
          {isNotFound && <NotFoundPage />}
      </PageTransition>
      <Footer />
    </>
  )
}

export default App