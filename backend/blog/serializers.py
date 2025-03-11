from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Tag, Post, Comment
from .models import Page

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'created_at']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at', 'updated_at', 'is_approved']
        read_only_fields = ['author', 'is_approved']

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['title', 'slug', 'content', 'meta_title', 'meta_description', 'created_at', 'updated_at']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    category_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    tag_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'content', 'featured_image',
                'excerpt', 'category', 'category_id', 'tags', 'tag_ids',
                'status', 'created_at', 'updated_at', 'published_at', 'comments']
        read_only_fields = ['author']

    def create(self, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])
        category_id = validated_data.pop('category_id', None)
        
        post = Post.objects.create(**validated_data)
        
        if category_id:
            post.category_id = category_id
        
        if tag_ids:
            post.tags.set(tag_ids)
        
        post.save()
        return post

    def update(self, instance, validated_data):
        tag_ids = validated_data.pop('tag_ids', None)
        category_id = validated_data.pop('category_id', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if category_id is not None:
            instance.category_id = category_id
        
        if tag_ids is not None:
            instance.tags.set(tag_ids)
        
        instance.save()
        return instance