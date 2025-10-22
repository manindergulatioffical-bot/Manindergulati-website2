function Title({ title, description }: { title: string, description: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-semibold mb-2 text-primary">- {title} -</h2>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  )
}

export { Title }