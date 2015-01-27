from rest_framework import permissions

class IsUserSocialAuthenticated(permissions.BasePermission):
	def has_object_permission(self, request, view, pages):
		if request.user:
			return account == request.user
		return False