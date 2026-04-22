import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import PublishProjectForm from "../components/project/PublishProjectForm";

export default function PublishProjectPage() {
  return (
    <PageReveal>
      <PageContainer>
        <Reveal>
          <PublishProjectForm />
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
