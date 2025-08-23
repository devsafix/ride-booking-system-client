interface IProps {
  title: string;
  subTitle: string;
}

export default function PageHeader({ title, subTitle }: IProps) {
  return (
    <section className="relative md:py-16 py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-lg md:text-xl dark:text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          {subTitle}
        </p>
      </div>
    </section>
  );
}
