// components/custom/CategoryCard.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  id: string;
  name: string;
  description?: string;
}

export default function CategoryCard({ id, name, description }: CategoryCardProps) {
  return (
    <Link href={`/${id}`}>
      <Card className="overflow-hidden transition-transform hover:scale-105">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}