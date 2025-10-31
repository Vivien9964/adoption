import Button from '../components/common/Button'

const HomePage = () => {

    return(
        <div className="min-h-screen bg-blue-400/60 p-8">
            <div className="max-w-4xl mx-auto space-y-4">

                <h1 className="text-3xl font-bold mb-8">Buttons</h1>


                {/* Primary button test */}
                <div className="space-x-4">
                    <Button variant="primary" size="small">Small primary</Button>
                    <Button variant="primary" size="medium">Medium primary</Button>
                    <Button variant="primary" size="large">Large primary</Button>
                </div>

                {/* Secondary button test */}
                <div className="space-x-4">
                    <Button variant="secondary" size="medium">Secondary</Button>
                </div>

                {/* Outline button test */}
                <div className="bg-gray-800 p-4 space-x-4">
                    <Button variant="outline" size="medium">Outline</Button>
                </div>

                {/* Mobile button */}
                <div className="max-w-xs">
                    <Button variant="primary" fullWidth>Full width for mobile</Button>
                </div>

            </div>

        </div>
    )
}

export default HomePage;