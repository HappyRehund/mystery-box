'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Package, Calendar, CreditCard, Eye } from 'lucide-react';

interface OrderItem {
  id: string;
  mysteryBoxId: string;
  quantity: number;
  price: number;
  mysteryBox: {
    id: string;
    name: string;
    imageUrl: string | null;
    description: string | null;
  };
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  method: string | null;
  createdAt: string;
}

interface Order {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  payment: Payment | null;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-orange-100 text-orange-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      const authResponse = await fetch('/api/auth/me');
      
      if (authResponse.ok) {
        // Fetch user orders
        const response = await fetch('/api/orders');
        
        if (response.ok) {
          const userOrders = await response.json();
          setOrders(userOrders);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } else {
        // Handle guest user - check localStorage for order
        const guestOrderId = localStorage.getItem('orderId');
        
        if (guestOrderId) {
          const guestUserId = localStorage.getItem('guestUserId');
          const response = await fetch(`/api/orders/${guestOrderId}?guestId=${guestUserId}`);
          
          if (response.ok) {
            const guestOrder = await response.json();
            setOrders([guestOrder]);
          } else {
            setOrders([]);
          }
        } else {
          setOrders([]);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
      toast.error('Failed to load your orders');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            {[1, 2, 3].map((i) => (
              <Card key={i} className="mb-6">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Orders</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={fetchOrders}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage your mystery box orders</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button onClick={() => router.push('/')}>Browse Mystery Boxes</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span>Order #{order.id.slice(-8)}</span>
                        <Badge 
                          className={statusColors[order.status as keyof typeof statusColors]}
                        >
                          {order.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Calendar className="h-4 w-4" />
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(parseFloat(order.totalPrice.toString()))}
                      </p>
                      {order.payment && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          {order.payment.method || 'Card'}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.mysteryBox.imageUrl || '/placeholder.png'}
                              alt={item.mysteryBox.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {item.mysteryBox.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {formatPrice(parseFloat(item.price.toString()) * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatPrice(parseFloat(item.price.toString()))} each
                            </p>
                          </div>
                        </div>
                        {index < order.items.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
