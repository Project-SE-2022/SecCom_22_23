from django.db import models

class Intrusion(models.Model):
    camera_id = models.IntegerField(null=True)
    intrusion_timestamp = models.CharField(max_length=50,null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name