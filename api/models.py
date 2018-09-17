from django.db import models
from django.contrib.auth.models import User


class Requests(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    desc = models.TextField(max_length=400)
    dateTime = models.DateTimeField(auto_now=True,auto_created=True)
    priority = models.BooleanField()
    isPending = models.BooleanField()
    seen = models.BooleanField()


class Sans(models.Model):
    id = models.AutoField(primary_key=True)
    day = models.IntegerField()
    startTime = models.CharField(max_length=400, default='00:00')
    endTime = models.CharField(max_length=400, default='00:00')


class Tickets(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sans = models.ForeignKey(Sans, on_delete=models.DO_NOTHING)
    desc = models.TextField(max_length=400)
    date = models.DateField(auto_now=True)
    isPending = models.BooleanField()


class UserNotifications(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    dateTime = models.DateTimeField(auto_now=True)
    ticket = models.ForeignKey(Tickets, on_delete=models.CASCADE)
    seen = models.BooleanField()


class AdminNotifications(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    request = models.ForeignKey(Requests, on_delete=models.CASCADE)
    time = models.TimeField(auto_now=True)
    seen = models.BooleanField()
