import { createFileRoute, Link as RouterLink, useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Quote,
  Link2,
  Image as ImageIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Code2,
  Minus,
  Undo2,
  Redo2,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CheckSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { getBlogPost } from '@/server/get-blog';
import { createBlogPost } from '@/server/create-blog';
import { editBlogPost } from '@/server/edit-blog';

export const Route = createFileRoute('/__admin/post-builder/$id')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { id } = params;
    const { data: post } = await getBlogPost({ data: { slug: id } });
    return { post };
  },
});

const DRAFT_KEY = 'mediumish:draft';

type SEOState = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage: string;
  indexable: boolean;
};

type DraftPayload = {
  title: string;
  contentJSON: any;
  seo?: SEOState;
  updatedAt: number;
};

export default function RouteComponent() {
  const navigate = useNavigate();
  const { post } = Route.useLoaderData();
  const isEditing = !!post;

  const saved = useMemo(() => {
    // If editing a post, don't use localStorage
    if (isEditing) return null;

    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? (JSON.parse(raw) as DraftPayload) : null;
    } catch {
      return null;
    }
  }, [isEditing]);

  const [title, setTitle] = useState<string>(post?.title || saved?.title || '');
  const [seo, setSeo] = useState<SEOState>(() => {
    if (post?.seo) {
      return {
        metaTitle: post.seo.metaTitle || '',
        metaDescription: post.seo.metaDescription || '',
        canonicalUrl: post.seo.canonicalUrl || '',
        ogImage: post.seo.ogImage || '',
        indexable: post.seo.indexable ?? true,
      };
    }

    return {
      metaTitle: saved?.seo?.metaTitle || '',
      metaDescription: saved?.seo?.metaDescription || '',
      canonicalUrl: saved?.seo?.canonicalUrl || '',
      ogImage: saved?.seo?.ogImage || '',
      indexable: saved?.seo?.indexable ?? true,
    };
  });

  const editor = useEditor({
    extensions: [
      Color.configure({ types: ['textStyle'] }),
      TextStyle,
      Underline,
      Highlight,
      Typography,
      TaskList,
      TaskItem.configure({ nested: true }),

      StarterKit.configure({
        dropcursor: { width: 2 },
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({ openOnClick: true, autolink: true, defaultProtocol: 'https' }),
      Image.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: ({ node }) => (node.type.name === 'heading' ? 'Heading' : 'Tell your story…'),
        includeChildren: true,
      }),
      CharacterCount.configure(),
    ],
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-neutral dark:prose-invert max-w-none focus:outline-none',
      },
      handleDrop(view, event) {
        const hasFiles = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length;
        if (!hasFiles) return false;
        const images = Array.from(event.dataTransfer!.files).filter((file) => /image/i.test(file.type));
        images.forEach((image) => {
          const reader = new FileReader();
          reader.onload = () => {
            view.dispatch(view.state.tr);
            editor
              ?.chain()
              .focus()
              .setImage({ src: reader.result as string })
              .run();
          };
          reader.readAsDataURL(image);
        });
        event.preventDefault();
        return true;
      },
      handlePaste(view, event) {
        if (!event.clipboardData) return false;
        const items = Array.from(event.clipboardData.items);
        const image = items.find((i) => i.type.indexOf('image') === 0);
        if (image) {
          const file = image.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = () =>
              editor
                ?.chain()
                .focus()
                .setImage?.({ src: reader.result as string })
                .run();
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
    content: post?.contentJSON || saved?.contentJSON || undefined,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      if (text.length % 1000 === 0) {
        toast('Autosaving…');
      }
    },
  });

  const editorJSON = editor?.getJSON();

  const wordCount = useMemo(() => {
    if (!editor) return 0;
    const text = editor.getText();
    return text ? text.trim().split(/\s+/).length : 0;
  }, [editorJSON]);

  const readTime = Math.max(1, Math.round(wordCount / 200));

  const plainText = editor?.getText() ?? '';
  const derivedDescription =
    seo.metaDescription ||
    (plainText ? plainText.trim().replace(/\s+/g, ' ').slice(0, 160) : 'Medium-style writing interface with a clean, focused experience.');
  const canonical = seo.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '/');
  const ogImage = seo.ogImage;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveAsDraft);
    return () => {
      window.removeEventListener('beforeunload', saveAsDraft);
    };
  }, []);

  const addImageFromDevice = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () =>
        editor
          ?.chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const [isPublishing, setIsPublishing] = useState(false);

  const saveAsDraft = async () => {
    const payload: DraftPayload = { title, contentJSON: editorJSON, seo, updatedAt: Date.now() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    toast.success('Draft saved');
  };

  const handleStartNew = () => {
    localStorage.removeItem(DRAFT_KEY);
    setTitle('');
    setSeo({
      metaTitle: '',
      metaDescription: '',
      canonicalUrl: '',
      ogImage: '',
      indexable: true,
    });
    editor?.commands.setContent('');
    navigate({ to: '/post-builder/$id', params: { id: 'new' } });
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Please provide a title');
      return;
    }

    if (!editorJSON) {
      toast.error('Please add some content');
      return;
    }

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_') // spaces to underscores
      .replace(/[^a-z0-9_]/g, ''); // remove everything not alphanumeric or underscore

    // Basic slug validation
    if (!/^[a-z0-9-_]+$/.test(slug)) {
      toast.error('Slugified title can only contain lowercase letters, numbers, and hyphens');
      return;
    }

    setIsPublishing(true);
    try {
      const publishData = {
        title: title.trim(),
        slug,
        contentJSON: editorJSON,
        seo: {
          metaTitle: seo.metaTitle || title.trim(),
          metaDescription: seo.metaDescription || derivedDescription,
          canonicalUrl: seo.canonicalUrl || canonical,
          ogImage: seo.ogImage || ogImage,
          indexable: seo.indexable,
        },
      };

      if (isEditing) {
        await editBlogPost({ data: publishData });
        toast.success('Post updated successfully!');
      } else {
        await createBlogPost({ data: publishData });
        toast.success('Post published successfully!');
        // Clear localStorage after successful publish
        navigate({ to: '/post-builder/$id', params: { id: slug } });
        localStorage.removeItem(DRAFT_KEY);
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="w-full">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-3xl mx-auto flex items-center gap-3 py-3">
          <div className="font-semibold text-sm text-muted-foreground">{isEditing ? 'Editing Post' : 'New Post'}</div>
          <Separator orientation="vertical" className="h-6" />
          <div className="ml-auto flex items-center gap-2">
            <div className="text-xs text-muted-foreground hidden md:block">
              {wordCount} words • {readTime} min
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="transition-all">
                  SEO
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>SEO settings</DialogTitle>
                  <DialogDescription>Optimize search and social previews for this post.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta title</Label>
                    <Input
                      id="meta-title"
                      value={seo.metaTitle}
                      onChange={(e) => setSeo((s) => ({ ...s, metaTitle: e.target.value }))}
                      placeholder="Meta title for search engines"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-desc">Meta description</Label>
                    <Textarea
                      id="seo-desc"
                      value={seo.metaDescription}
                      onChange={(e) => setSeo((s) => ({ ...s, metaDescription: e.target.value }))}
                      placeholder="Up to 160 characters"
                    />
                    <p className="text-xs text-muted-foreground">{derivedDescription.length}/160</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="canonical">Canonical URL</Label>
                    <Input
                      id="canonical"
                      value={seo.canonicalUrl}
                      onChange={(e) => setSeo((s) => ({ ...s, canonicalUrl: e.target.value }))}
                      placeholder="https://example.com/your-post"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og-image">Social image URL</Label>
                    <Input
                      id="og-image"
                      value={seo.ogImage}
                      onChange={(e) => setSeo((s) => ({ ...s, ogImage: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="indexable"
                      checked={seo.indexable}
                      onCheckedChange={(checked) => setSeo((s) => ({ ...s, indexable: Boolean(checked) }))}
                    />
                    <Label htmlFor="indexable">Allow indexing</Label>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button">Done</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {!isEditing && (
              <Button variant="outline" className="transition-all data-[state=open]:scale-95" onClick={saveAsDraft}>
                Save as draft
              </Button>
            )}
            <Button variant="outline" className="transition-all data-[state=open]:scale-95" onClick={handleStartNew}>
              Start New
            </Button>

            <Button variant="default" className="transition-all data-[state=open]:scale-95" onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? 'Publishing...' : isEditing ? 'Update' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto pt-8 pb-24">
        <h1 className="sr-only">Minimalist Medium-like Editor</h1>
        <section aria-label="Compose" className="space-y-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border-0 px-0 text-4xl md:text-5xl font-serif bg-transparent focus-visible:ring-0 focus-visible:outline-none"
          />

          {/* Toolbar */}
          <div className="flex items-center gap-1 flex-wrap rounded-lg border bg-card p-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  aria-label="Bold"
                  data-active={editor?.isActive('bold')}
                >
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleItalic().run()} aria-label="Italic">
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleUnderline().run()} aria-label="Underline">
                  <UnderlineIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Underline</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleStrike().run()} aria-label="Strikethrough">
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  data-active={editor?.isActive('heading', { level: 1 })}
                  aria-label="H1"
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  data-active={editor?.isActive('heading', { level: 2 })}
                  aria-label="H2"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                  data-active={editor?.isActive('heading', { level: 3 })}
                  aria-label="H3"
                >
                  <Heading3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 3</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBulletList().run()} aria-label="Bullet list">
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bullet list</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  aria-label="Ordered list"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ordered list</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleTaskList().run()} aria-label="Task list">
                  <CheckSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Task list</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBlockquote().run()} aria-label="Blockquote">
                  <Quote className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Blockquote</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} aria-label="Code block">
                  <Code2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code block</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().setHorizontalRule().run()} aria-label="Separator">
                  <Minus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Separator</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={addImageFromDevice} aria-label="Insert image">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert image</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const url = window.prompt('Paste link');
                    if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }}
                  aria-label="Link"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add link</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleHighlight().run()} aria-label="Highlight">
                  <Highlighter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Highlight</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                  aria-label="Align left"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align left</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                  aria-label="Align center"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align center</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                  aria-label="Align right"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align right</TooltipContent>
            </Tooltip>
            <div className="ml-auto flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().undo().run()} aria-label="Undo">
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().redo().run()} aria-label="Redo">
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Editor */}
          <article className="relative">
            {editor && (
              <>
                <BubbleMenu editor={editor} tippyOptions={{ duration: 150 }} className="bubble-menu">
                  <div className="flex items-center gap-1 rounded-md border bg-popover p-1 shadow-sm">
                    <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Bold">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Italic">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleUnderline().run()} aria-label="Underline">
                      <UnderlineIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const url = window.prompt('Paste link');
                        if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                      }}
                      aria-label="Link"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </div>
                </BubbleMenu>
                <FloatingMenu editor={editor} tippyOptions={{ duration: 150 }} className="floating-menu">
                  <div className="flex items-center gap-1 rounded-md border bg-popover p-1 shadow-sm">
                    <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                      <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                      <List className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={addImageFromDevice}>
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </FloatingMenu>
              </>
            )}
            <EditorContent editor={editor} className="min-h-[50vh]" />
          </article>
        </section>
      </main>
    </div>
  );
}
