
import { Separator } from "@/components/common/ui/separator";
import { Clock, CalendarDays } from "lucide-react";

const mockArticle = {
  articleId: "article_1",
  courseId: "course_web_dev_101",
  title: "Understanding React Hooks: A Deep Dive",
  summary: "Learn the fundamentals of React Hooks and how they revolutionize state management and side effects in functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum ac nibh nec venenatis. Phasellus bibendum a lorem non tempor. Donec tempor egestas libero, dictum condimentum est blandit quis. Aliquam erat libero, feugiat a egestas quis, tincidunt et dui. Duis mattis nunc nibh, porttitor tempor nisi mollis ut. Nulla cursus volutpat nunc, eget consequat lacus accumsan a. Suspendisse eu accumsan lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin cursus, purus vitae dapibus vulputate, urna urna vestibulum lorem, volutpat maximus nisl turpis dignissim ante. In mauris magna, pellentesque vel varius sed, rutrum sit amet lectus.

Sed ultrices ultrices feugiat. Praesent maximus at mi non mattis. Nam bibendum hendrerit dolor nec dignissim. Praesent vel lacus mattis, bibendum felis a, consequat mi. Ut suscipit metus vitae orci pretium, nec porttitor quam finibus. Nullam lobortis, ex in tristique sagittis, lacus mauris dignissim metus, eget posuere lorem tellus nec lorem. Suspendisse potenti. Sed ornare metus nec diam efficitur malesuada. Sed viverra tortor eu velit lacinia convallis.

Nullam lobortis ut ligula a volutpat. Etiam sed orci non tellus blandit luctus sit amet quis ex. Maecenas et maximus risus. Proin semper, dui vitae tempus maximus, nunc odio molestie tellus, ac facilisis mauris urna id nulla. Sed bibendum odio sit amet magna pharetra, nec dictum libero malesuada. Ut augue urna, faucibus quis purus ut, consectetur eleifend neque. Aliquam eu lectus purus. Suspendisse potenti. Proin placerat commodo purus eu rutrum.

Etiam placerat, nisi in lobortis posuere, justo tortor condimentum sem, quis laoreet nibh diam vitae lorem. Sed dolor turpis, malesuada posuere nisi dapibus, bibendum porttitor ex. Integer imperdiet sagittis metus, sit amet ullamcorper urna dignissim rutrum. Sed faucibus mi at massa imperdiet, eu aliquet nibh vestibulum. Morbi tincidunt dignissim enim, eu rutrum enim hendrerit eget. Duis scelerisque ante eget turpis lobortis, eu tincidunt eros laoreet. Sed consequat non nibh eget tempus. Curabitur aliquet non ipsum et vestibulum.

Sed et congue magna. Morbi ac pretium velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque at semper urna. Sed ac nisi risus. Praesent lectus metus, tempor in tincidunt id, aliquam vitae massa. Praesent varius metus in mollis lobortis.`,
  order: 3,
  createdAt: "2024-03-15T08:30:00Z",
  updatedAt: "2024-03-16T14:22:00Z",
};

const ArticleDetailPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {mockArticle.title}
          </h1>
          
          <p className="text-lg text-muted-foreground">
            {mockArticle.summary}
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Created {new Date(mockArticle.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated {new Date(mockArticle.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="pt-6"> {/* Replacing CardContent */}
          <div className="prose prose-gray max-w-none">
            {mockArticle.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('•')) {
                return (
                  <ul key={index} className="list-disc pl-4">
                    {paragraph.split('•').filter(Boolean).map((item, i) => (
                      <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;