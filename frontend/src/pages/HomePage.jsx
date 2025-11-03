import Button from '../components/common/Button'
import Section from '../components/layout/Section'

const HomePage = () => {

    return(
        <main className="min-h-screen bg-blue-400/60 p-8">
           
           <Section background="blue" padding="normal" maxWidth="7xl">
            <h2 className="text-3xl font-bold mb-4">Section test</h2>
            <p className="text-gray-700 mb-6">
                This is a test for a section.
            </p>

            <Button variant="primary">Test Button</Button>
           </Section>


           <Section background="white" padding="large" maxWidth="2xl" className="mt-4">
            <h2 className="text-3xl font-bold mb-4">Section test</h2>
            <p className="text-gray-700 text-center">
                This is a test for a section.
            </p>

            <Button variant="secondary">Test Button</Button>
           </Section>


           <Section background="blue" padding="normal" maxWidth="7xl" className="mt-6">
            <h2 className="text-3xl font-bold mb-4">Section test</h2>
            <p className="text-gray-700 mb-6">
                This is a test for a section.
            </p>

            <Button variant="primary">Test Button</Button>
           </Section>

        </main>
    )
}

export default HomePage;