import PublishArticleForm from "../components/article/PublishArticleForm";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";

export default function PublishArticlePage() {
  return (
    <PageReveal>
      <PageContainer>
        <Reveal>
          <PublishArticleForm />
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
